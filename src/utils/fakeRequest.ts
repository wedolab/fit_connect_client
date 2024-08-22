export function fakeRequest(): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const fakeResponse = { message: 'Fake data received!' };
            resolve(fakeResponse);
        }, 2000); // Имитация задержки в 2 секунды
    });
}