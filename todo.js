const fs = require('fs');
const {Command} = require('commander');
const program = new Command();

const file = 'todo.json';

const loadTodos = () => {
    if(!fs.existsSync(file)) {
        fs.writeFile(file, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

const saveTodos = (todos) =>{
    fs.writeFileSync(file, JSON.stringify(todos, null, 2));
};

//below we are giving a meta data of the program
program
    .name('Filesystem Based Todo List CLI')
    .description('CLI to manage tasks via cli')
    .version('0.8.0')

program.command('add')
    .description('Add a task to the file')
    .argument('<task>', 'Task to record')
    .action((task) => {
        const todos = loadTodos();
        todos.push({task, done:false});
        saveTodos(todos);
        console.log(`Added: ${task}`);
    })

program.command('delete')
    .description('Delete a todo from its index')
    .argument('<index>', 'Delete a todo')
    .action((index) => {
        const todos = loadTodos();
        const todo = todos.splice(index, 1);
        saveTodos(todos);
        if(todo.length > 0) {
            console.log(`Deleted: "${todo[0].task}"`);
        } else {
            console.log('Invalid index!');
        }
    })    


program.command('done')
    .description('Mark a todo as done')
    .argument('<index>')
    .action((index) => {
        const todos = loadTodos();
        if(index < todos.length && index >= 0) {
            todos[index].done = true;
            saveTodos(todos);
            console.log(`Marked as done: "${todos[index].task}"`);
        } else {
            console.log('Invalid index!');
        }
    });

program.command('list')
    .description('Lists all todos')
    .action(() => {
        const todos = loadTodos();
        console.log('Your Todos: ');
        todos.forEach((todo, index) =>{
            console.log(`[${index}] ${todo.done ? '[✅]' : '[ ]'} ${todo.task}`);
        })
    })

program.parse(process.argv);