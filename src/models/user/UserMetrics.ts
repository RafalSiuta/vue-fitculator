

export class UserMetrics {
    name: string | null
    age: number | null
    gender: boolean | null
    weight: number | null
    height: number | null
    neck: number | null
    hips: number | null
    activity: number | null

    constructor(
        // name: string | null,
        // age: number | null,
        // gender: boolean | null,
        // weight: number | null,
        // height: number | null,
        // neck: number | null,
        // hips: number | null,
        // activity: number | null
        name = "Test",
        age = 35,
        gender =  true,
        weight = 115,
        height  = 191,
        neck = 45,
        hips = 120,
        activity = 1.2
    ) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.weight = weight;
        this.height = height;
        this.neck = neck;
        this.hips = hips;
        this.activity = activity;
    }
}