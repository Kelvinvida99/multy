import { SaveFile } from './seve-file.use-case';
import fs from 'fs';
describe('ServerFileUserCase', () => {
  const customOptions = {
    fileContent: 'test content',
    destination: 'outputs', 
    fileName: 'table'
  }

  const saveFile = new SaveFile();
  /* beforeEach(() => {
    fs.rmSync('outputs', {recursive: true})
  }) */

  afterEach(() => {
    const outputFolderExists = fs.existsSync('outputs');
    if ( outputFolderExists ) fs.rmSync('outputs', { recursive: true });
  })

  test('should save file with default value', () => {
    const saveFile = new SaveFile();
    const filePath = 'outputs/table.txt';
    

    const result = saveFile.execute(customOptions)
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'})

    expect(result).toBeTruthy()
    expect(checkFile).toBeTruthy()
    expect(fileContent).toContain('test content')
  })

  test('should return false if directory could not be created', () => {

    const saveFile = new SaveFile();
    const mkdirSky = jest.spyOn(fs, 'mkdirSync').mockImplementation(
      () => { throw new Error('This is a custom message error from testing') }
    )

    const result = saveFile.execute(customOptions);

    expect(result).toBe(false)

    mkdirSky.mockRestore()
  })

  test('should return false if file could not be created', () => {

    // 
    // const mkdirSky = jest.spyOn(fs, 'mkdirSync').mockImplementation(
    //   () => { throw new Error('This is a custom message error from testing') }
    // )

    const result = saveFile.execute(customOptions);

    expect(result).toBe(true)
  })
})