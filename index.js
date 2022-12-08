#! /usr/bin/env node

/*
 * @Author: luhaifeng666 youzui@hotmail.com
 * @Date: 2022-12-07 16:17:52
 * @LastEditors: luhaifeng666
 * @LastEditTime: 2022-12-08 10:36:50
 * @Description: 
 */

import 'zx/globals'
import inquirer from 'inquirer'
import path from 'path'
import { writeFile } from 'node:fs/promises'
import { Command } from 'commander'
import { createRequire } from 'module'

const getPackageContent = (dir = './package.json') => createRequire(import.meta.url)(dir)

const SETTING_KEYS = [
  { key: 'id', required: true },
  { key: 'name', required: true },
  { key: 'version', required: false },
  { key: 'minAppVersion', required: false, defaultValue: '0.15.0' },
  { key: 'description', required: true },
  { key: 'author', required: true },
  { key: 'authorUrl', required: false },
  { key: 'fundingUrl', required: false },
  { key: 'isDesktopOnly', required: false, defaultValue: false },
]
const commander = new Command()

commander.version(getPackageContent().version, '-v, --version')
  .option('-i, --init', 'init an obsidian plugin project')

commander.parse(process.argv)

if (commander.opts().init) {
  inquirer.prompt(SETTING_KEYS.map(({ key, required, defaultValue = '' }) => ({
    type: 'input',
    name: key,
    message: `Obsidian plugin ${key}`,
    ...(required ? {
      validate: answer => {
        if (!(answer.trim())) {
          return `The plugin ${key} is required!`
        }
        return true
      }
    } : {}),
    default: defaultValue !== '' ?  defaultValue : null
  }))).then(async answers => {
    const { id, version, description, author, authorUrl } = answers
    await $`git clone git@github.com:obsidianmd/obsidian-sample-plugin.git ${id}`
    // init manifest.json
    await writeFile(
      path.resolve(process.env.PWD, id, 'manifest.json'),
      JSON.stringify(answers, null, 2)).catch(err => console.error(chalk.red(err.message))
    );
    // init package.json
    await writeFile(
      path.resolve(process.env.PWD, id, 'package.json'),
      JSON.stringify({
        ...getPackageContent(path.resolve(process.env.PWD, id, 'package.json'),),
        name: id,
        homepage: authorUrl,
        version, description, author
      }, null, 2)).catch(err => console.error(chalk.red(err.message))
    )

    console.log(chalk.blue('Generating...'))

    await $`cd ${id} && rm -rf .git && git init`

    console.log(chalk.green(`
Initialization completed!

run 'cd ${id} && npm i' to start~

Enjoy :)
    `))
	}).catch(err => {
		console.error(chalk.red(err))
	})
}