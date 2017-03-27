import chai, { expect } from 'chai';
import {CLIEngine} from 'eslint';

describe('eslint', () => {

  it('should validate the .eslintrc configuration file', () => {

    const cli = new CLIEngine({
      useEslintrc: false,
      configFile: './eslintrc.json'
    })

    expect(cli.executeOnText('// this is a comment\n').errorCount).to.equal(0);
  });

});
