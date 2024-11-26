const fs = require('fs');
const {Command} = require('commander');
const program = new Command();

//below we are giving a meta data of the program
program
    .name('File Related CLI')
    .description('CLI to do file based tasks')
    .version('0.8.0')


//below is the very first command of the cli which is count,
// 
program.command('count_lines')
    .description('Count the number of lines in a file') //this is the description of the command
    .argument('<file>', 'file to count') //this is the single argument that is expects  which is a file name
    .action((file) => { //this is the action we perform
        fs.readFile(file, 'utf-8', (err, data) => {
            if(err) {
                console.log(err);
            } else {
                let words = 0;
                for(let i = 0; i<data.length; i++) {
                    if(data[i] == '\n'){
                        words++;
                    }
                }
                console.log(`There are ${words+1} lines in the ${file}`);
                
                
            }
        });
    });;



program.command('count')
    .description('Count the number of words in a file') //this is the description of the command
    .argument('<file>', 'file to count') //this is the single argument that is expects  which is a file name
    .action((file) => { //this is the action we perform
        fs.readFile(file, 'utf-8', (err, data) => {
            if(err) {
                console.log(err);
            } else {
                let words = 0;
                for(let i = 0; i<data.length; i++) {
                    if(data[i] == ' '){
                        words++;
                    }
                }
                console.log(`There are ${words+1} words in the ${file}`);
                
                
            }
        });
    });

program.parse();