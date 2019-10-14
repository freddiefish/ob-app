export class Feedback {

    constructor(
        public id: number,
        public rating: number,
        public comment: string,
        public background: string,
        public otherBackground?: string,
        public email?: string
    ) {}
}
