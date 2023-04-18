import React, { useState, useRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { usePdf } from '@mikecousins/react-pdf';
import { IconButton, Tooltip } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

const FileViewModal = ({ hideFileView, data, image }) => {
    console.log(image);
    const [page, setPage] = useState(1);
    const canvasRef = useRef(null);
    const { pdfDocument, pdfPage } = usePdf({
        file: data,
        page,
        canvasRef
    });

    return (
        <MainCard title="File View" backIcon handleBackEvent={hideFileView}>
            <>
                {!image ? (
                    <>
                        {Boolean(pdfDocument && pdfDocument.numPages) && (
                            <div style={{ justifyContent: 'center', display: 'flex' }}>
                                <Tooltip title="Previous">
                                    <IconButton disabled={page === 1} onClick={() => setPage(page - 1)}>
                                        <ArrowLeft />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Next">
                                    <IconButton disabled={page === pdfDocument.numPages} onClick={() => setPage(page + 1)}>
                                        <ArrowRight />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {!pdfDocument && <span>Loading...</span>}
                            <canvas ref={canvasRef} />
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={data} width="500px" alt="attachments" height="500px" />
                    </div>
                )}
            </>
        </MainCard>
    );
};

export default FileViewModal;
