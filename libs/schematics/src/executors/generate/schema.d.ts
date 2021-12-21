/**
 * Schema for the schematic options.
 */
export interface GenerateExecutorSchema {
  /**
   * The current working directory.
   */
  cwd: string;

  /**
   * The path to the output files.
   */
  outputGeneratedPath: string;

  /**
   * The path to the input files.
   */
  inputHapifyGeneratedPath: string;

  /**
   * Do we want to format the output files?
   */
  format: boolean;

  /**
   * Do we want to clean the generated folder before generating the files?
   */
  cleanFirst: boolean;
}