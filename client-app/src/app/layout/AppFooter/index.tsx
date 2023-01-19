import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="appFooter">
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Políticas de Privacidade
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Termos & condições
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Políticas de Devolução
      </Typography.Link>
      <Typography.Link href="tel:11945671278" target={"_blank"}>
       (11) 9 4567-1278
      </Typography.Link>
    </div>
  );
}

export default AppFooter;
