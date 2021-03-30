import React from "react";
import { useRealmApp } from "../../realm/RealmApp";
import {
  Dropdown,
  Button,
  Modal,
  Form
} from "semantic-ui-react";
import validator from "validator";
import NumericInput from "react-numeric-input";
import { useHistory } from "react-router-dom";


//TODO: This should be defines as a rule, not in a component
enum GameTypes {
  Hearts = "Hearts",
  Poker = "Poker"
}

type Rule = {
  id: string,
  min: number,
  max: number,
  default: number,
  current?: number | null
}

export default function StartNewTable() {
  const { user } = useRealmApp();
  let history = useHistory();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false); //states "login" or "register"
  const [tableName, setTableName] = React.useState<string>("");
  const [gameType, setGameType] = React.useState<string | undefined>(GameTypes.Hearts)
  const [rules, setRules] = React.useState<Rule[]>([{ id: "players", min: 4, max: 4, default: 4, current: 4 }]);
  const [submitting, setSubmitting] = React.useState<boolean>(false);


  let playerOptions: { min: number, max: number } = { min: 0, max: 0 };
  React.useEffect(() => {
    console.log(gameType)
    console.log(rules)
    setRules([]);
    let r = []
    switch (gameType) {
      case GameTypes.Hearts:
        r.push({ id: "players", min: 4, max: 4, default: 4, current: 4 })
        break;
      case GameTypes.Poker:
        r.push({ id: "players", min: 1, max: 4, default: 4, current: 4 })
        break
    }
    setRules(r);
  }, [gameType])

  // Keep track of input validation/errors
  const [error, setError] = React.useState<{
    tableName?: string;
  }>({});

  const handleNewTable = async () => {
    const isValidTableName = validator.isAscii(tableName) && validator.isByteLength(tableName, { min: 1, max: 20 });
    if (isValidTableName) {
      let newTable;
      try {
        //create the new table
        const playersRule = rules.find(e => e.id == "players")
        const table = {
          name: tableName,
          rules: {
            players: playersRule?.current
          },
          gameType: gameType
        }
        newTable = await user?.functions.requestNewTable(table);
        console.log(newTable);

        //join the new table
        newTable = await user?.functions.joinTable(newTable.tableId, 0);

        await user?.refreshCustomData();
        history.push("/games");
      } catch (err) {
        console.log(err);
      }

    } else {
      setError((err) => ({ ...err, tableName: "Must be between 1 and 20 ascii characters" }));
    }

  };

  const gameOptions: { key: string, text: string, value: GameTypes }[] = [
    { key: "h", text: GameTypes.Hearts, value: GameTypes.Hearts },
    { key: "hp", text: GameTypes.Poker, value: GameTypes.Poker }
  ]

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onOpen={() => setModalOpen(true)}
      closeOnDimmerClick={false}
      trigger={
        <Button
          floated="left"
          disabled={!user?.profile?.email}>
          Start A Table
          </Button>}

      as={Form}
      centered
      onSubmit={() => handleNewTable()}
    >
      <Modal.Header>New Table</Modal.Header>
      <Form.Field
        control={Form.Input}
        label='Table Name'
        placeholder="table123"
        onChange={(e: any) => {
          console.log(e.target);
          setError((e) => ({ ...e, tableName: undefined }));
          setTableName(e.target.value);
        }}
        value={tableName}
        error={error.tableName}>
      </Form.Field>

      <Dropdown
        inline={true}
        control={Form.Select}
        label='Game Type'
        options={gameOptions}
        placeholder="Game Type"
        value={gameType}
        onChange={(e: any, { value }) => { setGameType(value?.toString()) }}
      />
      {rules.map((rule) => {
        return (
          <NumericInput key={rule.id}
            min={rule.min}
            max={rule.max}
            value={rule.default}
            onChange={(value: number | null) => { rule.current = value }}
          />
        )
      })}


      <Button onClick={() => setModalOpen(false)}>Cancel</Button>
      <Button type='submit'>Submit</Button>
    </Modal>
  );
}