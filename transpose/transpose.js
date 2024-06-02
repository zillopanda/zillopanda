// List of musical notes including sharps and flats
const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

function transposeToKey(originalNote, targetKey, secondNotes) {
    /**
     * Transpose multiple musical notes to a specified key based on original and target key.
     *
     * @param {string} originalNote - The original note (e.g., 'C', 'Ab', 'A')
     * @param {string} targetKey - The target key to transpose to (e.g., 'D', 'Bb', 'G')
     * @param {Array} secondNotes - The array of second notes to calculate the transposition (e.g., ['F', 'Bb', 'C'])
     * @returns {Array} The transposed notes array
     */
    try {
        // Find the index of the original note and target key
        const originalIndex = notes.indexOf(originalNote);
        const targetIndex = notes.indexOf(targetKey);

        if (originalIndex === -1 || targetIndex === -1) {
            return "Invalid note or key";
        }

        // Calculate the number of semitones to transpose
        const semitones = targetIndex - originalIndex;

        // Transpose each second note
        const transposedNotes = secondNotes.map(secondNote => {
            const secondIndex = notes.indexOf(secondNote);
            if (secondIndex === -1) {
                return `Invalid note: ${secondNote}`;
            }

            let transposedIndex = (secondIndex + semitones) % notes.length;
            if (transposedIndex < 0) {
                transposedIndex += notes.length;
            }
            return notes[transposedIndex];
        });

        return transposedNotes;
    } catch (error) {
        return "An error occurred";
    }
}

function transposeNotes() {
    const originalNote = document.getElementById("originalNote").value;
    const targetKey = document.getElementById("targetKey").value;
    const secondNotesInput = document.getElementById("secondNotes").value;

    const secondNotes = secondNotesInput.split(',').map(note => note.trim());

    const transposedNotes = transposeToKey(originalNote, targetKey, secondNotes);

    document.getElementById("hiddenBeforeResult").style.display = "block";

    if (typeof transposedNotes === 'string') {
        document.getElementById("result").innerText = transposedNotes;
        return;
    }

    const result = `
        Transposing notes from ${originalNote} to ${targetKey}:<br>
        ${secondNotes.map((note, index) => `${note} → ${transposedNotes[index]}`).join('<br>')}
    `;

    document.getElementById("result").innerHTML = result;
}
