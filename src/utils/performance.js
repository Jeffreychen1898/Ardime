class Performance {
    constructor() {
        this.m_startTime = new Date().getTime();
        this.m_elapsedTime = undefined;
    }

    start() {
        this.m_startTime = new Date().getTime();
    }

    stop() {
        this.m_elapsedTime = new Date().getTime() - this.m_startTime;
        return this.m_elapsedTime;
    }

    getElapsedTime(_type) {
        switch(_type) {
            case "millisec":
                return this.m_elapsedTime;
            case "seconds":
                return this.m_elapsedTime / 1000;
            case "minutes":
                return this.m_elapsedTime / 60_000;
            case "hours":
                return this.m_elapsedTime / 360_000;
            
            default:
                return this.m_elapsedTime;
        }
    }
}

export default Performance;