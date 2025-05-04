export class Task {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly isCompleted: boolean,
    ) {
    }
}