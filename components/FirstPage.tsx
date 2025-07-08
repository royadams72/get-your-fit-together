"use client";
import { KeyValueMap } from "@/types/interfaces/KeyValueMap";
import Button from "./Button";
import CopyComponent from "./CopyComponent";
import { PATHS } from "@/routes.config";

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
    </>
  );
};

export default FirstPage;
