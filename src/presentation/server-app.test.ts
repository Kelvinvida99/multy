import { CreateTable } from "../domain/use-case/create-table.use-case";
import { SaveFile } from "../domain/use-case/seve-file.use-case";
import { ServerApp } from "./server-app";

describe("Server App", () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    name: "test-fileName",
    destination: "test-destination",
  };

  test("should create Server App intance", () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("should run ServerApp with options", () => {
    const logSpy = jest.spyOn(console, "log");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith("Server runnig...");
    expect(logSpy).toHaveBeenLastCalledWith("file created!");

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      destination: options.destination,
      fileName: options.name,
    });
  });

  // test("should run with custom value mocked", () => {
  //   const logMock = jest.fn();
  //   const logErrorMock = jest.fn();
  //   const createMock = jest.fn().mockRejectedValue("1 x 2 = 2");
  //   const saveFileMock = jest.fn();

  //   console.log = logMock;
  //   console.error = logErrorMock;
  //   CreateTable.prototype.execute = createMock;
  //   SaveFile.prototype.execute = saveFileMock;

  //   ServerApp.run(options);

  //   expect(logMock).toHaveBeenCalledWith("Server running...");
  //   expect(createMock).toHaveBeenCalledWith({
  //     base: options.base,
  //     limit: options.limit,
  //   });
    
  // });
});
