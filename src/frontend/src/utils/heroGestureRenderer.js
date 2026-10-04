import { getHeroGestureState, heroGesturePoses } from './heroGesture';

const vertexSource = `
attribute vec2 point;
uniform vec2 leftPalm, rightPalm, leftDelta, rightDelta;
varying vec2 uv, position;
void main() {
  uv = point;
  vec2 l = (point - leftPalm) / vec2(.19, .20);
  vec2 r = (point - rightPalm) / vec2(.19, .20);
  float gate = smoothstep(.48, .61, point.y);
  position = point + gate * (leftDelta * exp(-dot(l,l)*.5) + rightDelta * exp(-dot(r,r)*.5));
  gl_Position = vec4(position.x*2.-1., 1.-position.y*2., 0., 1.);
}`;
const fragmentSource = `
precision mediump float;
uniform sampler2D image;
uniform float weight, bodyPass, armSide;
varying vec2 uv, position;
float range(float value, float low, float high) {
  return smoothstep(low-.008, low, value) * (1.-smoothstep(high, high+.008, value));
}
void main() {
  float leftMask = 1.-smoothstep(.382,.398,position.x);
  float rightMask = smoothstep(.615,.632,position.x);
  float sideMask = armSide < -.5 ? leftMask : armSide > .5 ? rightMask : leftMask + rightMask;
  float arms = sideMask * smoothstep(.49,.56,position.y);
  float straps = (range(position.x,.333,.408)+range(position.x,.594,.668)) * range(position.y,.50,.696);
  arms *= 1.-min(1.,straps);
  float mask = mix(arms,1.-arms,bodyPass);
  vec4 color = texture2D(image,uv);
  float alpha = color.a * mask * weight;
  gl_FragColor = vec4(color.rgb * alpha, alpha);
}`;

export const createHeroGestureRenderer = (canvas, images, scene = 0) => {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true });
  if (!gl) throw new Error('WebGL unavailable');
  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Gesture shader failed');
    return shader;
  };
  const shaders = [compile(gl.VERTEX_SHADER, vertexSource), compile(gl.FRAGMENT_SHADER, fragmentSource)];
  const program = gl.createProgram();
  shaders.forEach(shader => gl.attachShader(program, shader)); gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Gesture program failed');
  gl.useProgram(program);
  const mesh = [], divisions = 36;
  for (let y = 0; y < divisions; y++) for (let x = 0; x < divisions; x++) {
    const a = [x/divisions,y/divisions], b = [(x+1)/divisions,y/divisions];
    const c = [x/divisions,(y+1)/divisions], d = [(x+1)/divisions,(y+1)/divisions];
    mesh.push(...a,...b,...c,...b,...d,...c);
  }
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(mesh),gl.STATIC_DRAW);
  const point = gl.getAttribLocation(program,'point');
  gl.enableVertexAttribArray(point); gl.vertexAttribPointer(point,2,gl.FLOAT,false,0,0);
  const uniforms = Object.fromEntries(['leftPalm','rightPalm','leftDelta','rightDelta','weight','bodyPass','armSide','image']
    .map(name => [name,gl.getUniformLocation(program,name)]));
  const textures = images.map(image => {
    const texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D,texture);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);
    return texture;
  });
  gl.uniform1i(uniforms.image,0); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE,gl.ONE);
  const draw = (index, state, weight, bodyPass = false, armSide = 0) => {
    const pose = heroGesturePoses[index];
    gl.bindTexture(gl.TEXTURE_2D,textures[scene === 0 ? 0 : index]);
    for (const side of ['left','right']) {
      gl.uniform2fv(uniforms[`${side}Palm`],pose[side]);
      gl.uniform2fv(uniforms[`${side}Delta`],bodyPass ? [0,0] : state.points[side].map((value,axis) => value-pose[side][axis]));
    }
    gl.uniform1f(uniforms.weight,weight); gl.uniform1f(uniforms.bodyPass,Number(bodyPass));
    gl.uniform1f(uniforms.armSide,armSide);
    gl.drawArrays(gl.TRIANGLES,0,mesh.length/2);
  };
  return {
    render(elapsed) {
      const rect = canvas.getBoundingClientRect();
      const density = Math.min(window.devicePixelRatio || 1,2);
      const width = Math.max(1,Math.round(rect.width*density)), height = Math.max(1,Math.round(rect.height*density));
      if (canvas.width !== width || canvas.height !== height) { canvas.width=width; canvas.height=height; }
      gl.viewport(0,0,width,height); gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT);
      const state = getHeroGestureState(elapsed,scene);
      draw(4,state,1,true);
      if (scene === 4 || scene === 6) {
        const resting = { ...state, points: { ...state.points, left: heroGesturePoses[2].left } };
        draw(2,resting,1,false,-1);
        draw(state.from,state,1-state.mix,false,1);
        if (state.to !== state.from) draw(state.to,state,state.mix,false,1);
      } else {
        draw(state.from,state,1-state.mix);
        if (state.to !== state.from) draw(state.to,state,state.mix);
      }
      return state;
    },
    dispose() {
      textures.forEach(texture => gl.deleteTexture(texture)); gl.deleteBuffer(buffer);
      gl.deleteProgram(program); shaders.forEach(shader => gl.deleteShader(shader));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
};
