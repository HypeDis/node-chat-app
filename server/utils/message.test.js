let expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        //store res in variable
        const from = 'Mark';
        const text = 'How are you?'

        let message = generateMessage(from,text);
        
        expect(message).toMatchObject({from, text});
        
        expect(typeof message.createdAt).toBe('number');

    });
});