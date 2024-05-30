function getLineCount(element: HTMLElement): number {
    const style = window.getComputedStyle(element);
    const lineHeight = parseFloat(style.lineHeight);
    const height = element.scrollHeight;
    return Math.floor(height / lineHeight);
}

export function splitTextByLineCount(text: string, maxLines: number, element: HTMLElement): { leftText: string, rightText: string } {
    const words = text.split(' ');
    let currentText = '';
    let currentLines = 0;
    console.log(words)

    element.innerText = '';

    for (let i = 0; i < words.length; i++) {
        const testText = currentText + (currentText ? ' ' : '') + words[i];
        element.innerText = testText;
        console.log(testText)
        const lines = getLineCount(element);

        if (lines > maxLines) {
            break;
        }

        currentText = testText;
        currentLines = lines;
    }

    return {
        leftText: currentText,
        rightText: text.substring(currentText.length).trim()
    };
}