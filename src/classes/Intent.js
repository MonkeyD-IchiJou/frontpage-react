class Intent {
    constructor(intent, entities, texts) {
        this.intent = intent
        this.entities = [...entities]
        this.texts = [...texts]
    }
}

export default Intent