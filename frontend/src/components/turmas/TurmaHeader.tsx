import { Box, Typography} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';


export default function TurmaHeader({ turno }: { turno: any }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Typography
        textTransform="uppercase"
        fontSize={25}
        sx={{
          fontFamily: "var(--font-title)",
          flexGrow: 1,
        }}
      >
        Turno: {turno}
      </Typography>
      <Tooltip
        arrow 
        placement="left"
        title="Tempo até sair da solicitação de matrícula" 
      >
        <Box
          sx={{
            backgroundColor: "var(--background-div)",
            borderRadius: "25px",
            width: "120px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            textTransform="uppercase"
            fontSize={25}
            padding={1}
          >
            00:30
          </Typography>
        </Box>
      </Tooltip>
    </Box>
  );
}
