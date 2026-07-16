---
name: todo
description: handle creation and maintenance of a TODO list with the todo+ extension
argument-hint: adding and removing todos, projects, and notes
---
# Intro

Create and maintain a TODO list with the todo+ extension. You can create projects, todos, and notes in a simple text format. The extension will help you keep track of your tasks, their status, and time estimates. 

You will be asked to add, remove or update todos, projects, and notes. You can also mark todos as done, cancelled, or started, and the extension will automatically calculate the elapsed time for each todo.

## Usage

- there's `todo` file in the root of the project, which is used to store all the todos, you don't need to edit any other files
- create projects, features, or tasks by adding a line with a colon at the end
- create todos for these by adding lines starting with a checkbox symbol (☐ for pending, ✔ for done, ✘ for cancelled). Do not use other symbols, as they will not be recognized by the extension
- you can add tags to your todos using the @ symbol, and there are some special tags like @critical, @high, @low, and @today, but use these sparingly
- you can add time estimates to your todos using the @est tag, and the extension will automatically calculate the total time for each project
- you can mark todos as started using the @started tag, and the extension will automatically calculate the elapsed time for each todo
- tasks can be nested inside each other, just add indentation to the lines and end with a colon 

## Example 

```markdown
Projects:
  ☐ Anything with a colon at the end of the line is a project
  ☐ Projects will show some statistics next to them @1h
    ✔ By default those statistics are the number of pending todos and the sum of their time estimates @30m
  Nested:
    ☐ You can nest projects inside each other and fold them

Todos:
  You can write plain text notes/descriptions wherever you want
  New:
    ☐ Press Cmd/Ctrl+Enter to add a new todo
  Done:
    ✔ Press Alt+D to mark a todo as done
    ✔ Press it again to undo the action
  Cancelled:
    ✘ Press Alt+C to mark a todo as cancelled
    ✘ Press it again to undo the action
  Tagging:
    ☐ You can add tags using the @ symbol, like this @tag
    ☐ There are some special, customizable tags: @critical @high @low @today
  Timekeeping:
    ✔ Completed todos can show a timestamp @done(17-11-03 10:42)
    ☐ Press Alt+S to mark a todo as started @started(17-11-03 10:42)
      ✔ Now it will show the elapsed time @started(17-11-03 10:42) @done(17-11-03 20:11) @lasted(9h29m)
    ☐ You can provide time estimates for your todos @1h30m
      ☐ We are even doing some natural language processing @est(1 day and 20 minutes)

Formatting:
  You can format text in a markdown-like fashion
  Bold:
    ☐ Use asterisks for *bold*
  Italic:
    ☐ Use underscores for _italic_
  Strikethrough:
    ☐ Use tildes for ~strikethrough~
  Code:
    ☐ Use backticks for `code`

Archive:
  ✔ You can archive finished todos here
  ✔ Congratulations, you are now a Todo+ master!
```