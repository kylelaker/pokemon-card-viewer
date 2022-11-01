import Modal from "@cloudscape-design/components/modal";
import Button from "@cloudscape-design/components/button";
import Box from "@cloudscape-design/components/box";
import Icon from "@cloudscape-design/components/icon";
import TextContent from "@cloudscape-design/components/text-content";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import React from "react";

export interface SetModalProps {
  set: PokemonTCG.Set;
  cardNumber: string;
}

export default function SetModal(props: SetModalProps) {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <TextContent>
        <Button variant="link" formAction="none" onClick={_ => setVisible(true)} iconUrl={props.set.images.symbol} /> {props.cardNumber}/{props.set.total}
      </TextContent>
      <Modal
        onDismiss={() => setVisible(false)}
        visible={visible}
        closeAriaLabel="Close modal"
        footer={
          <Box float="right">
            <Button variant="primary" onClick={_ => setVisible(false)}>Dismiss</Button>
          </Box>
        }
        header={(<>{props.set.name} <Icon url={props.set.images.symbol} size="big"/></>)}
      >
      <TextContent>
        <strong>Released</strong>: {props.set.releaseDate}
        <br/>
        <strong>Series</strong>: {props.set.series}
        <br />
        <strong>Legality</strong>
        <br />
        <em>Standard</em>: {props.set.legalities.standard ?? "-"}
        <br />
        <em>Expanded</em>: {props.set.legalities.expanded ?? "-"}
        <br />
        <em>Unlimited</em>: {props.set.legalities.unlimited ?? "-"}
      </TextContent>
      </Modal>
    </>
  );
}
