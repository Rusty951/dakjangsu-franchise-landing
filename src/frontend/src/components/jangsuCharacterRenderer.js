// A deformable texture of the real character PNG; no replacement character art.
const vertexSource = `
  attribute vec2 a_position;
  uniform float u_time;
  varying vec2 v_uv;
  vec2 turn(vec2 p, vec2 pivot, float angle) {
    float c = cos(angle), s = sin(angle);
    return pivot + mat2(c, s, -s, c) * (p - pivot);
  }
  void main() {
    vec2 original = a_position * vec2(1122.0, 1402.0);
    vec2 p = original;
    float t = u_time;
    float greeting = smoothstep(.45, .95, t) * (1.0 - smoothstep(2.55, 3.1, t));
    float wrist = sin((t - .55) * 8.0) * .115 * greeting;
    float elbow = sin((t - .72) * 8.0) * .034 * greeting;
    float handWeight = smoothstep(760.0, 815.0, p.x)
      * (1.0 - smoothstep(515.0, 590.0, p.y)) * smoothstep(270.0, 315.0, p.y);
    p = mix(p, turn(p, vec2(875.0, 537.0), wrist), handWeight);
    float armWeight = smoothstep(735.0, 805.0, original.x)
      * (1.0 - smoothstep(690.0, 770.0, original.y)) * smoothstep(260.0, 320.0, original.y);
    p = mix(p, turn(p, vec2(830.0, 667.0), elbow), armWeight);
    float bow = sin(clamp((t - 3.1) / 1.25, 0.0, 1.0) * 3.14159265);
    bow *= bow;
    float headWeight = (1.0 - smoothstep(465.0, 550.0, original.y))
      * (1.0 - smoothstep(735.0, 785.0, original.x) * smoothstep(260.0, 310.0, original.y));
    float headAngle = sin((t - .9) * 8.0) * .004 * greeting - bow * .014;
    vec2 head = turn(p, vec2(569.0, 506.0), headAngle) + vec2(0.0, bow * 3.4);
    p = mix(p, head, headWeight);
    float follow = sin((t - .86) * 8.0) * .0028 * greeting;
    float feetPin = 1.0 - smoothstep(1130.0, 1320.0, original.y);
    p = mix(p, turn(p, vec2(561.0, 1275.0), follow), feetPin);
    float settle = 1.0 - smoothstep(4.4, 5.4, t);
    float breath = sin(t * 1.35) * 1.1 * settle;
    p.y -= breath * (1.0 - smoothstep(840.0, 1240.0, original.y));
    v_uv = a_position;
    gl_Position = vec4(p.x / 1122.0 * 2.0 - 1.0, 1.0 - p.y / 1402.0 * 2.0, 0.0, 1.0);
  }
`;
const fragmentSource = `
  precision mediump float;
  uniform sampler2D u_picture;
  varying vec2 v_uv;
  void main() {
    vec4 color = texture2D(u_picture, v_uv);
    gl_FragColor = vec4(color.rgb * color.a, color.a);
  }
`;

export function createJangsuRenderer(canvas, image) {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true, preserveDrawingBuffer: true });
  if (!gl) return null;
  const shaders = [];
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  const texture = gl.createTexture();
  const dispose = () => {
    shaders.forEach(shader => gl.deleteShader(shader));
    gl.deleteProgram(program);
    gl.deleteBuffer(buffer);
    gl.deleteTexture(texture);
  };
  for (const [type, code] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]]) {
    const shader = gl.createShader(type);
    shaders.push(shader);
    gl.shaderSource(shader, code);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { dispose(); return null; }
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { dispose(); return null; }
  gl.useProgram(program);
  const vertices = [];
  const columns = 48, rows = 60;
  for (let y = 0; y < rows; y++) for (let x = 0; x < columns; x++) {
    const left = x / columns, right = (x + 1) / columns;
    const top = y / rows, bottom = (y + 1) / rows;
    vertices.push(left, top, right, top, left, bottom, left, bottom, right, top, right, bottom);
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.uniform1i(gl.getUniformLocation(program, 'u_picture'), 0);
  const clock = gl.getUniformLocation(program, 'u_time');
  const resize = () => {
    const width = Math.min(canvas.clientWidth, canvas.clientHeight * 1122 / 1402);
    const pixels = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.min(1122, Math.round(width * pixels)));
    canvas.height = Math.round(canvas.width * 1402 / 1122);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  resize();
  gl.clearColor(0, 0, 0, 0);
  return {
    draw(time) {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(clock, time);
      gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
    },
    resize,
    dispose,
  };
}
