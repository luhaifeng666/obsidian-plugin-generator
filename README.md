<!--
 * @Author: luhaifeng666 youzui@hotmail.com
 * @Date: 2022-12-07 18:47:33
 * @LastEditors: luhaifeng666
 * @LastEditTime: 2022-12-07 19:09:44
 * @Description: 
-->

<p align="center">
  <img src='./logo.svg' width="100" />
</p>

<h1 align="center">Obsidian Plugin Generator</p>

<p align="center">For generating the obsidian plugin project.</p>

## Install

``` bash
npm i -g obsidian-plugin-generator
```

## Usage

```bash
Usage: opg [options]

Options:
  -v, --version  output the version number
  -i, --init     init an obsidian plugin project
  -h, --help     display help for command
```

## Properties

| Property        | Type    | Required | Description                                                                                |
|-----------------|---------|----------|--------------------------------------------------------------------------------------------|
| `author`        | string  | **Yes**  | The plugin author's name.                                                                  |
| `description`   | string  | **Yes**  | The long description of your plugin.                                                       |
| `id`            | string  | **Yes**  | The ID of your plugin.                                                                     |
| `name`          | string  | **Yes**  | The display name of your plugin.                                                           |
| `isDesktopOnly` | boolean | No       | Whether your plugin uses NodeJS or Electron APIs. The default value is **false**.          |
| `minAppVersion` | string  | No       | The minimum required Obsidian version for your plugin. The default value is **'0.15.0'**.  |
| `version`       | string  | No       | The version of your plugin. The default value is **'1.0.0'**.                              |
| `authorUrl`     | string  | No       | A URL to your own website.                                                                 |
| `fundingUrl`    | string  | No       | Funding url.                                                                               |
