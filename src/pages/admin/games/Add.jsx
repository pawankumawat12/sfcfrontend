import React from "react";
import Breadcrumb from '../../../components/ui/BreadCrumb';
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

const Create = () => {
  return (
    <>
      <Breadcrumb pageTitle="Games" subTitle="add" pagePath={`/games`} />{" "}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="mb-7 text-lg font-semibold text-gray-800 dark:text-white/90">
          Add new games
        </h3>

        <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
          <form className="flex flex-col">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <Input
                type="text"
                label="Game name"
                name="name"
                placeholder="Enter your game name"
              />{" "}
              <Input
                type="text"
                label="Category"
                name="category"
                placeholder="Enter your category"
              />{" "}
              <Input
                type="file"
                label="Thumbnail"
                name="name"
                placeholder="Enter your game name"
              />
            </div>
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">
                IsFeatured
              </p>

              <div className="flex gap-6">
                {/* YES */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isFeatured"
                    value="yes"
                    className="accent-blue-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-400">
                    Yes
                  </span>
                </label>

                {/* NO */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isFeatured"
                    value="no"
                    className="accent-blue-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-400">
                    No
                  </span>
                </label>
              </div>
              <div className="flex w-full justify-end ">
                <Button
                  type="submit"
                  className=" mt-4 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
