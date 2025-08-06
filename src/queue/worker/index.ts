import scrappingWorker from "./scrapping.worker";

const registerWorker = () => {
  if (!scrappingWorker.isRunning()) {
    scrappingWorker.run();
  }
};

export default registerWorker;