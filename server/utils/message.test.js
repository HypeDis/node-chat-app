let expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        //store res in variable
        const from = 'Mark';
        const text = 'How are you?'

        let message = generateMessage(from, text);

        expect(message).toMatchObject({ from, text });

        expect(typeof message.createdAt).toBe('number');

    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'Ben';
        const latitude = 1;
        const longitude = 2;
        const locationMessage = generateLocationMessage(from, latitude, longitude);
        const url = 'https://www.google.com/maps?q=1,2';

        expect(locationMessage).toMatchObject({ from, url });
        expect(typeof locationMessage.from).toBe('string');
        expect(typeof locationMessage.createdAt).toBe('number');
    });
});