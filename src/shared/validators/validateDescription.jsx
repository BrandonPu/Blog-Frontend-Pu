const bannedWords = ["puta", "mierda", "coño", "gilipollas", "cabron"]; // Amplía según necesites

export function validateDescription(description) {
    const trimmed = description.trim();
    if (trimmed.length < 5) {
        return { valid: false, error: "La descripción es muy corta." };
    }
    const lowerDesc = trimmed.toLowerCase();
    for (const word of bannedWords) {
        if (lowerDesc.includes(word)) {
            return { valid: false, error: "La descripción contiene lenguaje inapropiado." };
        }
    }
    return { valid: true };
}
