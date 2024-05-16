describe('Pastebin site', () => {

    beforeEach(async () => {
        await browser.url('https://pastebin.com');
    })

    const codeForPaste = 'git config --global user.name  "New Sheriff in Town" \ngit reset $(git commit-tree HEAD^{tree} -m "Legacy code")\ngit push origin master --force'

    it('Adding and checking a new paste', async () => {

        await $('#postform-text').addValue(codeForPaste);
        
        const selectBoxSyntax = await $('#postform-format');
        await browser.execute(() => {
            document.getElementById('postform-format').classList.remove('select2-hidden-accessible');
            document.getElementById('postform-format').style = "";
        });

        await selectBoxSyntax.selectByAttribute('value', '8');

        const selectBoxExpiration = await $('#postform-expiration');
        await browser.execute(() => {
            document.getElementById('postform-expiration').classList.remove('select2-hidden-accessible');
            document.getElementById('postform-expiration').style = "";

        });
        await selectBoxExpiration.selectByAttribute('value', '10M');

        await $('#postform-name').setValue('how to gain dominance among developers');

        await $('.-big').click();

        await browser.waitUntil(async function () {
            return await $('.info-top > h1')
        }, {
            timeout: 50000,
        })

        const syntaxHighlighting = await $$('a');
        for (let elem of syntaxHighlighting) {
            if (elem.getAttribute('href') === "/archive/bash") {
                await elem.toHaveText('Bash');
            }
        }
        const pasteTitle = await $$('.info-top > h1');

        if (pasteTitle.length === 1) {
            await expect(pasteTitle[0]).toHaveText('how to gain dominance among developers');
        }
        const pasteCode = await $$('.source .bash');

        if (pasteCode.length === 1) {
            await expect(pasteCode[0]).toHaveText(codeForPaste);
        }

    })


})