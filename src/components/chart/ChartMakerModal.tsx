import { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import { ChartType, DataField } from "../../types/chart";
import { useStores } from "../../stores";
import Chart from ".";

interface ChartMakerModalProps {
  isOpen: boolean;
  onClose(): void;
}

const SettingsWrapper = styled.div<{ widthWithBP: string }>`
  display: flex;
  flex-direction: column;

  width: ${(p) => p.widthWithBP};
  height: fit-content;

  ${(p) =>
    p.widthWithBP === "100%" &&
    `
    margin-top: 20px;
  `}
`;

const SettingsGroupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const SettingWrapper = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;
`;

const SettingLabel = styled(Text).attrs({
  color: "gray.600",
  fontWeight: "semibold",
  fontSize: "sm",
  marginBottom: 1,
})``;

function ChartMakerModal({ isOpen, onClose }: ChartMakerModalProps) {
  const { analysisStore } = useStores();
  const modalSize = useBreakpointValue({ base: "full", lg: "6xl" }) || "lg";

  const [type, setType] = useState<ChartType>("bar");
  const [title, setTitle] = useState("Chart title");
  const [stacked, setStacked] = useState(true);
  const [dataOne, setDataOne] = useState<DataField>("horns");
  const [dataTwo, setDataTwo] = useState<DataField | "none">("continent");

  const dataTwoWithoutNone = dataTwo === "none" ? undefined : dataTwo;
  const stackabled = type === "bar";
  const yAxisUsable = type !== "pie";
  const prewiewWidth = modalSize === "full" ? "100%" : "60%";
  const settingsWidth = modalSize === "full" ? "100%" : "30%";

  const onChartCreate = () => {
    analysisStore.addChart({
      type,
      title,
      stacked,
      dataOne,
      dataTwo: dataTwoWithoutNone,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your own chart </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-evenly"
        >
          <Chart
            chart={{
              type,
              title,
              stacked,
              dataOne,
              dataTwo: dataTwoWithoutNone,
            }}
            width={prewiewWidth}
          />
          <SettingsWrapper widthWithBP={settingsWidth}>
            <SettingWrapper>
              <SettingLabel>Title</SettingLabel>
              <Input
                value={title}
                placeholder="Choose a chart Title"
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </SettingWrapper>
            <SettingWrapper>
              <SettingLabel>Chart Type</SettingLabel>
              <Select
                onChange={(e) => {
                  setType(e.currentTarget.value as ChartType);
                }}
                value={type}
                w="fit-content"
              >
                <option value="bar">BarChart</option>
                <option value="line">LineChart</option>
                <option value="pie">PieChart</option>
              </Select>
            </SettingWrapper>
            <SettingWrapper>
              <SettingLabel>Stacked chart (bar only)</SettingLabel>
              <Switch
                disabled={!stackabled}
                size="lg"
                isChecked={stacked}
                onChange={() => {
                  setStacked((oldVal) => !oldVal);
                }}
              />
            </SettingWrapper>

            <SettingsGroupWrapper>
              <SettingWrapper>
                <SettingLabel>Data 1</SettingLabel>
                <Select
                  onChange={(e) => {
                    setDataOne(e.currentTarget.value as DataField);
                  }}
                  value={dataOne}
                  w="fit-content"
                >
                  <option value="continent">Continent</option>
                  <option value="horns">Horns</option>
                </Select>
              </SettingWrapper>

              <SettingWrapper>
                <SettingLabel
                  fontWeight="semibold"
                  marginBottom={1}
                  color={!yAxisUsable ? "gray.300" : ""}
                >
                  Data 2 (bar/line only)
                </SettingLabel>
                <Select
                  onChange={(e) => {
                    setDataTwo(e.currentTarget.value as DataField);
                  }}
                  value={dataTwo}
                  w="fit-content"
                  disabled={!yAxisUsable}
                >
                  <option value="continent">Continent</option>
                  <option value="horns">Horns</option>
                  <option value="none">None</option>
                </Select>
              </SettingWrapper>
            </SettingsGroupWrapper>
          </SettingsWrapper>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="linkedin" onClick={onChartCreate}>
            Create
          </Button>
          <Button colorScheme="gray" marginLeft="4" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ChartMakerModal;
