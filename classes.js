class planet{
    constructor(name, mass, radius, angle, volume, img){
        this.name = name;
        this.mass = mass;
        this.radius = radius;
        this.angle = angle;
        this.volume = volume;
        this.img = img;
    }

    getMass(){
        return(this.mass.massValue*10**this.mass.massExponent);
    }
    getVolume(){
        return (this.volume.volValue*10**this.volume.volExponent);
    }
    getDensity(){
        return this.getMass()/(this.getVolume()*1000000000);
    }
}
