const fs = require('fs');
const { resolve } = require('path');
const { v4: uuid } = require('uuid');

class FileSaver {

    async store(path, buffer, options = {}) {

        const id        = options?.id ?? uuid();
        const name      = options?.name ?? '';
        const extension = options?.extension ?? '';

        try {

            const file = `${path}/${id}${name}.${extension}`;

            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true });
            }

            fs.writeFileSync(file, buffer);

            return { id, file: resolve(file) };

        } catch (e) {

            console.log(`${e.name}: ${e.message}`);
        }

        return null;
    }
}

module.exports = FileSaver;