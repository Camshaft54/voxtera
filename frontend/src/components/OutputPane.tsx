import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

interface OutputPaneProps {
    transcription: string
}

function OutputPane({transcription}: OutputPaneProps) {
    return (
        <Card sx={{width: 700}}>
            <CardContent orientation="horizontal">
                <div>
                    <Typography sx={{fontSize: 'lg', fontWeight: 'lg'}}>{transcription}</Typography>
                </div>
            </CardContent>
        </Card>
    );
}

export default OutputPane;
