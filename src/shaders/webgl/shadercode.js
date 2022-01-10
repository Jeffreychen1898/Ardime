const shaders = {"rect":{"vertex":"precision mediump float;\nattribute vec2 vertPosition;\n\nuniform vec4 color;\n\nvarying vec4 v_color;\n\nvoid main()\n{\n\tgl_Position = vec4(vertPosition, 0.0, 1.0);\n\tv_color = color;\n}","fragment":"precision mediump float;\n\nvarying vec4 v_color;\n\nvoid main() {\n\tgl_FragColor = v_color;\n}"}}; export default shaders;