export class Feedback {

    constructor(
        public id: number,
        public rating: number,
        public comment: string,
        public email?: string
    ) {}
}
