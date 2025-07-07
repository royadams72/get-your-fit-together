"use client";
import { KeyValueMap } from "@/types/interfaces/KeyValueMap";
import Button from "./Button";
import CopyComponent from "./CopyComponent";
import { PATHS } from "@/routes.config";
import Modal from "./Modal";

const FirstPage = ({ copy }: { copy: KeyValueMap[] }) => {
  return (
    <>
      <div>
        <CopyComponent copy={copy} />
      </div>
      <div className="btnContainer">
        <Button href={PATHS.ABOUT_YOU}>
          Get Started With Your Fitness Plan
        </Button>
        <Button inverted={true} href={PATHS.RETRIEVE_PLAN}>
          Retrieve Your Fitness Plan
        </Button>
      </div>
      <div className="coach-image"></div>
      <Modal>
        <Modal.Open opens="example">
          <Button>Open Modal</Button>
        </Modal.Open>

        <Modal.Window name="example">
          {({ onCloseModal }) => (
            <div>
              <h2>Hello from the modal</h2>
              <Button onClick={onCloseModal}>Close</Button>
            </div>
          )}
        </Modal.Window>
      </Modal>
    </>
  );
};

export default FirstPage;
