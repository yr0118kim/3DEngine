import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Camera from "./Camera";
import Renderer from "./Renderer";
import Scene from "./Scene";
import Light from './Light'
import { UpdateAble } from '../interface';

export default class ThreeDefault implements UpdateAble {
    private scene:Scene
    private camera:Camera
    private renderer:Renderer
    private light:Light
    // private control:OrbitControls
    private parent: HTMLElement
    constructor(
        parent: HTMLElement
    ) {
        this.parent = parent
        this.scene = new Scene()
        this.camera = new Camera(95, this.parent.clientWidth / this.parent.clientHeight)
        this.renderer = new Renderer(this.parent.clientWidth, this.parent.clientHeight, this.parent)
        // this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.light = new Light()
        this.light.addLight(this.scene)

        window.addEventListener('resize', this.resize.bind(this), false)
    }
    public update = (interval:number) => {
        // this.control.update()
        this.render()
    }
    public getScene() {
        return this.scene
    }
    public getCamera() {
        return this.camera
    }
    private render() {
        this.renderer.render(this.scene, this.camera)
    }
    private resize() {
        this.camera.aspect = this.parent.clientWidth / this.parent.clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.parent.clientWidth, this.parent.clientHeight)
        this.render()
    }
}

export { Camera, Renderer, Scene, Light }