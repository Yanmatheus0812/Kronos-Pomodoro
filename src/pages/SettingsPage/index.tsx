import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { Input } from "../../components/Input";
import { MainTemplate } from "../../templates/MainTemplate";
import { Button } from "../../components/Button";
import { useEffect, useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function SettingsPage() {
  useEffect(() => {
    document.title = "Configurações - Kronos";
  }, []);

  const { state, dispatch } = useTaskContext();
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    const formErros = [];

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErros.push("Digite apenas números para todos os campos");
    }

    if (workTime < 1 || workTime > 99) {
      formErros.push("Digite valores entre 1 e 99 para foco");
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErros.push("Digite valores entre 1 e 30 para descanso curto");
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      formErros.push("Digite valores entre 1 e 60 para descanso longo");
    }

    if (formErros.length > 0) {
      formErros.forEach((error) => {
        showMessage.error(error);
      });
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    showMessage.succes("Configurações salvas");
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: "center" }}>
          Modifique as configurações para tempo de foco, descanso curto e
          descanso longo
        </p>
      </Container>

      <Container>
        <form onSubmit={handleSaveSettings} action="" className="form">
          <div className="formRow">
            <Input
              id="workTime"
              labelText="Foco"
              ref={workTimeInput}
              defaultValue={state.config.workTime}
            />
          </div>
          <div className="formRow">
            <Input
              id="shortBreakTime"
              labelText="Descanso curto"
              ref={shortBreakTimeInput}
              defaultValue={state.config.shortBreakTime}
            />
          </div>
          <div className="formRow">
            <Input
              id="longBreakTime"
              labelText="Descanso longo"
              ref={longBreakTimeInput}
              defaultValue={state.config.longBreakTime}
            />
          </div>
          <div className="formRow">
            <Button
              icon={<SaveIcon />}
              aria-çabel="Salvar configurações"
              title="Salvar configurações"
            ></Button>
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
