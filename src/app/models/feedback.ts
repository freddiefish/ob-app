export class Feedback {

    constructor(
        public comment: string,
        public rating?: number,
        public background?: string,
        public otherBackground?: string,
        public email?: string
    ) {}
}
