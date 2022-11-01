AFRAME.registerComponent("bowling-balls", {
    init: function () {
        this.throwBalls()
    },
    throwBalls: function () {
        window.addEventListener("keydown", (e) => {
            if (e.key === "z") {
                var  ball = document.createElement("a-entity");
                ball.setAttribute("gltf-model", "./models/bowling_ball/scene.gltf");
                ball.setAttribute("scale", { x: 0.6, y: 0.6,  z: 0.6});
                var cam = document.querySelector("#camera");
                pos = cam.getAttribute("position");
                ball.setAttribute("position", {
                  x: pos.x,
                  y: pos.y-1.2,
                  z: pos.z,
                });
        
                var camera = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);
                ball.setAttribute("velocity", direction.multiplyScalar(-15));
                var scene = document.querySelector("#scene");
                ball.setAttribute("dynamic-body", {
                  shape: "sphere",
                  mass: "20",
                });
                ball.addEventListener("collide", this.removeBall);
                scene.appendChild(ball);
              }
            });
    },
    removeBalls: function (e) {
        var element = e.detail.target.el
        var elementHit = e.detail.body.el
        if (elementHit.id.includes("pin")) {
            elementHit.setAttribute("material", { opacity: 1, transparent: true })
        }
        var impulse = new CANNON.Vec3(-2, 2, 1)
        var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute("position"))
        elementHit.body.applyImpulse(impulse, worldPoint)
        element.removeEventListener("collide", this.throw)
        var scene = document.querySelector("#scene")
        scene.removeChild(element)
    }
})