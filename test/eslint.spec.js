import chai, { expect } from 'chai';
import { CLIEngine } from 'eslint';

describe('eslint', () => {
  it('should validate the .eslintrc configuration file', () => {
    const cli = new CLIEngine({
      useEslintrc: false,
      configFile: './eslintrc.json',
    });

    const report = cli.executeOnText('var x =  0;');
    const report2 = cli.executeOnText('// this is a coment\n');
    const report3 = cli.executeOnText('const x = 0;\n');
    const report4 = cli.executeOnText('let x = 1\n');

    expect(report.results[0].errorCount).to.equal(3);
    expect(report2.results[0].errorCount).to.equal(0);
    expect(report3.results[0].errorCount).to.equal(1);
    expect(report4.results[0].errorCount).to.equal(3);
  });
});
