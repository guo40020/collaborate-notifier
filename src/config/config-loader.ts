import * as yaml from "js-yaml";
import { readFileSync } from "fs"
import { join } from "path";
import { IConfiguration } from "./config-types";

const CONFIG_FILE = "config.yaml";

export default () => {
  return yaml.load(readFileSync(join(__dirname, CONFIG_FILE)).toString()) as IConfiguration;
}
