const vertexSource = `
attribute vec2 point;
uniform float arm, head, nod, kitchen;
varying vec2 uv;
vec2 turn(vec2 p, vec2 pivot, float angle) {
  float c = cos(angle), s = sin(angle);
  return pivot + mat2(c,s,-s,c) * (p-pivot);
}
void main() {
  vec2 p = point * vec2(1122.,1402.);
  vec2 original = p;
  float openingArm = smoothstep(710.,825.,p.x) * smoothstep(455.,530.,p.y)
    * (1.-smoothstep(770.,840.,p.y));
  float kitchenArm = (1.-smoothstep(350.,465.,p.x)) * smoothstep(430.,490.,p.y)
    * (1.-smoothstep(720.,785.,p.y));
  vec2 pivot = mix(vec2(745.,560.),vec2(425.,535.),kitchen);
  p = mix(p,turn(p,pivot,arm),mix(openingArm,kitchenArm,kitchen));
  float headWeight = 1.-smoothstep(435.,515.,original.y);
  vec2 tilted = turn(p,vec2(565.,475.),head + nod*.026);
  tilted.y += nod * 8.;
  p = mix(p,tilted,headWeight);
  uv = point;
  gl_Position = vec4(p.x/1122.*2.-1.,1.-p.y/1402.*2.,0.,1.);
}`;
const fragmentSource = `
precision mediump float;
uniform sampler2D picture;
varying vec2 uv;
void main() {
  vec4 color = texture2D(picture,uv);
  gl_FragColor = vec4(color.rgb*color.a,color.a);
}`;

export function createDesktopSupportRenderer(canvas, image, kind) {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true, preserveDrawingBuffer: true });
  if (!gl) return null;
  const shaders = [], program = gl.createProgram(), buffer = gl.createBuffer(), texture = gl.createTexture();
  const dispose = () => {
    shaders.forEach(shader => gl.deleteShader(shader));
    gl.deleteProgram(program); gl.deleteBuffer(buffer); gl.deleteTexture(texture);
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
  const vertices = [], columns = 64, rows = 80;
  for (let y = 0; y < rows; y++) for (let x = 0; x < columns; x++) {
    const a = [x / columns, y / rows], b = [(x + 1) / columns, y / rows];
    const c = [x / columns, (y + 1) / rows], d = [(x + 1) / columns, (y + 1) / rows];
    vertices.push(...a, ...b, ...c, ...b, ...d, ...c);
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  const point = gl.getAttribLocation(program, 'point');
  gl.enableVertexAttribArray(point); gl.vertexAttribPointer(point, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.uniform1i(gl.getUniformLocation(program, 'picture'), 0);
  gl.uniform1f(gl.getUniformLocation(program, 'kitchen'), Number(kind === 'kitchen'));
  const uniforms = Object.fromEntries(['arm', 'head', 'nod'].map(name => [name, gl.getUniformLocation(program, name)]));
  return {
    draw(state) {
      const rect = canvas.getBoundingClientRect(), density = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * density)), height = Math.max(1, Math.round(rect.height * density));
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
      gl.viewport(0, 0, width, height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      Object.entries(uniforms).forEach(([name, location]) => gl.uniform1f(location, state[name]));
      gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
    },
    dispose,
  };
}
