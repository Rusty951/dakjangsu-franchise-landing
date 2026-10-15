import { createJointWarp, desktopSupportPoses } from './desktopSupportMotion.mjs';

const vertexSource = `
attribute vec2 point;
uniform vec2 anchors[8], coefficients[8];
uniform float head, nod, lean;
varying vec2 uv;
varying float bodyMask;
vec2 turn(vec2 p, vec2 pivot, float angle) {
  float c = cos(angle), s = sin(angle);
  return pivot + mat2(c,s,-s,c) * (p-pivot);
}
void main() {
  vec2 registered = point;
  for (int i=0; i<8; i++) {
    float radius = length((point-anchors[i])/vec2(.28,.24));
    float falloff = pow(max(0.,1.-radius),4.)*(4.*radius+1.);
    registered += coefficients[i]*falloff;
  }
  vec2 source = point*vec2(1122.,1402.);
  float armRegion = smoothstep(.32,.38,point.y)*(1.-smoothstep(.76,.82,point.y));
  registered = mix(point,registered,armRegion);
  float apron = smoothstep(380.,425.,source.x)*(1.-smoothstep(650.,700.,source.x))
    *smoothstep(620.,650.,source.y)*(1.-smoothstep(735.,770.,source.y));
  float chest = smoothstep(370.,430.,source.x)*(1.-smoothstep(700.,750.,source.x))
    *smoothstep(430.,470.,source.y)*(1.-smoothstep(570.,610.,source.y));
  registered = mix(registered,point,max(apron,chest));
  bodyMask = 1.-armRegion;
  vec2 p = registered*vec2(1122.,1402.);
  float upper = 1.-smoothstep(820.,1250.,p.y);
  p = mix(p,turn(p,vec2(560.,1170.),lean),upper);
  float headWeight = 1.-smoothstep(435.,515.,registered.y*1402.);
  vec2 tilted = turn(p,vec2(565.,475.),head+nod*.043);
  tilted.y += nod*12.;
  p = mix(p,tilted,headWeight);
  uv = point;
  gl_Position = vec4(p.x/1122.*2.-1.,1.-p.y/1402.*2.,0.,1.);
}`;
const fragmentSource = `
precision mediump float;
uniform sampler2D picture, bodyPicture;
uniform float weight;
varying vec2 uv;
varying float bodyMask;
void main() {
  vec4 color = mix(texture2D(picture,uv),texture2D(bodyPicture,uv),bodyMask);
  float alpha = color.a*weight;
  gl_FragColor = vec4(color.rgb*alpha,alpha);
}`;

export function createDesktopSupportRenderer(canvas, images, kind) {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true, preserveDrawingBuffer: true });
  if (!gl) return null;
  const shaders = [], program = gl.createProgram(), buffer = gl.createBuffer(), textures = [];
  const dispose = () => {
    shaders.forEach(shader => gl.deleteShader(shader));
    gl.deleteProgram(program); gl.deleteBuffer(buffer); textures.forEach(texture => gl.deleteTexture(texture));
  };
  for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]]) {
    const shader = gl.createShader(type); shaders.push(shader);
    gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { dispose(); return null; }
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { dispose(); return null; }
  gl.useProgram(program);
  const vertices = [], columns = 72, rows = 90;
  for (let y = 0; y < rows; y++) for (let x = 0; x < columns; x++) {
    const a = [x / columns, y / rows], b = [(x + 1) / columns, y / rows];
    const c = [x / columns, (y + 1) / rows], d = [(x + 1) / columns, (y + 1) / rows];
    vertices.push(...a, ...b, ...c, ...b, ...d, ...c);
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  const point = gl.getAttribLocation(program, 'point');
  gl.enableVertexAttribArray(point); gl.vertexAttribPointer(point, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  for (const image of images) {
    const texture = gl.createTexture(); textures.push(texture); gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  }
  gl.uniform1i(gl.getUniformLocation(program, 'picture'), 0);
  gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D,textures[0]);
  gl.uniform1i(gl.getUniformLocation(program, 'bodyPicture'),1); gl.activeTexture(gl.TEXTURE0);
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
  const uniforms = Object.fromEntries(['anchors[0]', 'coefficients[0]', 'head', 'nod', 'lean', 'weight'].map(name => [name, gl.getUniformLocation(program, name)]));
  const poses = desktopSupportPoses[kind], warps = poses.map(pose => createJointWarp(pose.joints));
  const drawPose = (index, state, weight) => {
    if (weight <= 0) return;
    gl.bindTexture(gl.TEXTURE_2D, textures[index]);
    gl.uniform2fv(uniforms['anchors[0]'], poses[index].joints.flat());
    gl.uniform2fv(uniforms['coefficients[0]'], warps[index](state.joints).flat());
    gl.uniform1f(uniforms.weight, weight);
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
  };
  return {
    draw(state) {
      const rect = canvas.getBoundingClientRect(), density = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * density)), height = Math.max(1, Math.round(rect.height * density));
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
      gl.viewport(0, 0, width, height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      for (const name of ['head', 'nod', 'lean']) gl.uniform1f(uniforms[name], state[name]);
      // Keep one opaque silhouette. Both drawings share the registered joint
      // path; overlapping transparent poses would look like extra arms.
      drawPose(state.mix < .5 ? state.from : state.to, state, 1);
    },
    dispose,
  };
}
