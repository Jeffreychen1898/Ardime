class VerticesContainer {
    constructor(maxSize) {
        this.m_maxSize = maxSize;
        this.m_containerArrayCounter = 0;

        this.m_containerArray = [];
    }

    allocateArrays(amount) {
        for(let i=m_containerArray.length;i<amount;++i) {
            const new_node = new ContainerNode(this.m_maxSize);
            this.m_containerArray.push(new_node);
        }

        this.m_containerArrayCounter = amount;
    }

    /* @param { JSONArray } */
    /* [{index: number, data: JSONArray}] */
    addVertex(vertex) {
        for(const data of vertex) {
            if(data.index < m_containerArrayCounter) {
                return this.m_containerArray[data.index].append(data.data);
            }
        }
    }

    getVertexData(index) {
        if(index < this.m_containerArrayCounter) {
            return this.m_containerArray[index].getData();
        }
    }
}

class ContainerNode {
    constructor(maxSize) {
        this.m_data = new Array(maxSize);
        this.m_currentIndex = 0;
    }

    append(data) {
        if(this.m_currentIndex + data.length < this.m_data.length) {
            for(const each_data of data) {
                this.m_data[this.m_currentIndex ++] = each_data;
            }

            return true;
        }

        return false;
    }

    getData() {
        return this.m_data;
    }
}

return {
    VerticesContainer
};