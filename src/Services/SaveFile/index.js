const fs = require('fs');
const { v4: uuid } = require('uuid');

class SaveFile {

    store(path, buffer, options = {}) {

        const id        = options?.id ?? uuid();
        const name      = options?.name ?? '';
        const extension = options?.extension ?? 'jpg';

        try {

            const file = `${path}/${id}${name}.${extension}`;

            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true });
            }

            fs.writeFileSync(file, buffer);

            return id;

        } catch (e) {

            console.log(`${e.name}: ${e.message}`);
        }

        return null;
    }
}

module.exports = SaveFile;