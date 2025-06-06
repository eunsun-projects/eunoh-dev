/* eslint-disable @typescript-eslint/no-explicit-any */
import { Euler, EventDispatcher, Vector3 } from "three";

const changeEvent = { type: "change" };
const PI_2 = Math.PI / 2;

class CustomCameraRotationControls extends EventDispatcher {
  minPolarAngle = 0; // radians
  maxPolarAngle = Math.PI; // radians

  vector = new Vector3();
  euler = new Euler(0, 0, 0, "YXZ");

  onMouseMoveBind = this.onMouseMove.bind(this);
  onTouchMoveBind = this.onTouchMove.bind(this);
  onTouchEndBind = this.onTouchEnd.bind(this);

  camera: any;
  domElement: any;
  previousTouch: any;

  constructor(camera: any, domElementInput: any) {
    super();
    let currentDomElement = domElementInput;
    if (currentDomElement === undefined) {
      console.warn(
        'THREE.PointerLockControls: The second parameter "domElement" is now mandatory.',
      );
      currentDomElement = document.body;
    }
    this.camera = camera;
    this.domElement = currentDomElement;
    this.connect();
  }
  onTouchMove(e: any) {
    let touch;

    switch (e.touches.length) {
      case 1:
        if (e.touches[0].target === this.domElement) touch = e.touches[0];
        break;
      case 2:
        if (e.touches[0].target === this.domElement) touch = e.touches[0];
        else if (e.touches[1].target === this.domElement) touch = e.touches[1];
        break;
    }
    if (!touch) return;

    const movementX = this.previousTouch
      ? touch.pageX - this.previousTouch.pageX
      : 0;
    const movementY = this.previousTouch
      ? touch.pageY - this.previousTouch.pageY
      : 0;

    this.updatePosition(movementX, movementY, 0.004);
    this.previousTouch = touch;
  }
  onTouchEnd() {
    this.previousTouch = undefined;
  }
  onMouseMove(event: any) {
    const movementX =
      event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY =
      event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    this.updatePosition(movementX, movementY, 0.002);
  }
  updatePosition(movementX: any, movementY: any, multiplier: any) {
    this.euler.setFromQuaternion(this.camera.quaternion);
    this.euler.y += movementX * multiplier; //here
    this.euler.x += movementY * multiplier; //and here
    this.euler.x = Math.max(
      PI_2 - this.maxPolarAngle,
      Math.min(PI_2 - this.minPolarAngle, this.euler.x),
    );
    this.camera.quaternion.setFromEuler(this.euler);
    this.dispatchEvent(changeEvent as never);
  }
  connect() {
    this.domElement.addEventListener("touchmove", this.onTouchMoveBind, false);
    this.domElement.addEventListener("touchend", this.onTouchEndBind, false);
    this.domElement.addEventListener(
      "mousedown",
      this.addMouseMoveListener.bind(this),
    );
    this.domElement.addEventListener(
      "mouseup",
      this.removeMouseMoveListener.bind(this),
    );
  }
  addMouseMoveListener() {
    this.domElement.ownerDocument.addEventListener(
      "mousemove",
      this.onMouseMoveBind,
    );
  }
  removeMouseMoveListener() {
    this.domElement.ownerDocument.removeEventListener(
      "mousemove",
      this.onMouseMoveBind,
    );
  }
  disconnect() {
    this.domElement.removeEventListener(
      "touchmove",
      this.onTouchMoveBind,
      false,
    );
    this.domElement.removeEventListener("touchend", this.onTouchEndBind, false);
    this.domElement.ownerDocument.removeEventListener(
      "mousemove",
      this.onMouseMoveBind,
    );
  }
  dispose() {
    this.disconnect();
  }
  getObject() {
    return this.camera;
  }
  getDirection() {
    const direction = new Vector3(0, 0, -1);
    return (v: any) => {
      return v.copy(direction).applyQuaternion(this.camera.quaternion);
    };
  }
  moveForward(distance: any) {
    this.vector.setFromMatrixColumn(this.camera.matrix, 0);
    this.vector.crossVectors(this.camera.up, this.vector);
    this.camera.position.addScaledVector(this.vector, distance);
  }
  moveRight(distance: any) {
    this.vector.setFromMatrixColumn(this.camera.matrix, 0);

    this.camera.position.addScaledVector(this.vector, distance);
  }
}
export { CustomCameraRotationControls };
