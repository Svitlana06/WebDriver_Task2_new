describe('Pastebin site', () => {

    beforeEach(async () => {
        await browser.url('https://pastebin.com');
    })


    let codeForPaste = ['git config --global user.name  "New Sheriff in Town"', 'git reset $(git commit-tree HEAD^{tree} -m "Legacy code")', 'git push origin master --force']

    it('Adding and checking a new paste', async () => {

        let x = await $('#postform-text');
        for (let i = 0; i < codeForPaste.length; i++) { // adding a code
            await x.addValue(codeForPaste[i] + "\n");
        };

        var selectBoxSyntax = await $('#postform-format')
        await browser.execute(() => {
            document.getElementById('postform-format').classList.remove('select2-hidden-accessible');
            document.getElementById('postform-format').style = "";

        });
        await selectBoxSyntax.selectByAttribute('value', '8'); // Syntax Highlighting

        var selectBoxExpiration = await $('#postform-expiration')
        await browser.execute(() => {
            document.getElementById('postform-expiration').classList.remove('select2-hidden-accessible');
            document.getElementById('postform-expiration').style = "";

        });
        await selectBoxExpiration.selectByAttribute('value', '10M'); // // adding a paste expiration

        await $('#postform-name').setValue('how to gain dominance among developers') // adding a paste Name / title

        await $('.-big').click(); })

        it('Checking a new paste', async () => {   
        
        await browser.pause(6000);
        await expect($('.info-top')).toHaveText('how to gain dominance among developers');
        await expect($('.left').$('a')).toHaveText('Bash');
        for (let j = 0; j < codeForPaste.length; j++) {
            await expect($$('.de1')[j]).toHaveText(codeForPaste[j])
        }

    })


})