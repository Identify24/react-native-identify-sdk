import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export type WebSocketMessageHandler = (message: any) => void;

interface IdentifyGlobalWebSocketContextProps {
    sendMessage: (message: string) => void;
    addMessageHandler: (handler: WebSocketMessageHandler) => void;
    removeMessageHandler: (handler: WebSocketMessageHandler) => void;
}

const IdentifyGlobalWebSocketContext = createContext<IdentifyGlobalWebSocketContextProps | undefined>(undefined);


export const IdentifyGlobalWebSocketProvider: React.FC<{ children: any, socketUrl: string, socketPort: string }> = ({ children, socketUrl }) => {
    const socket = useRef<WebSocket | null>(null);
    const [messageHandlers, setMessageHandlers] = useState<WebSocketMessageHandler[]>([]);
    const [lastMessage, setLastMessage] = useState<any>(null)
    const sendMessage = useCallback((message: string) => {
     

        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
            socket.current.send(message);
        }
    }, [socket]);

    const addMessageHandler = useCallback((handler: WebSocketMessageHandler) => {
        setMessageHandlers((prevHandlers) => [...prevHandlers, handler]);
    }, []);

    const removeMessageHandler = useCallback((handler: WebSocketMessageHandler) => {
        setMessageHandlers((prevHandlers) => prevHandlers.filter(h => h !== handler));
    }, []);


    const ws = new WebSocket(socketUrl);

    useEffect(() => {
        if (!lastMessage) return;
        messageHandlers.forEach(handler => handler(lastMessage));
    }, [lastMessage])

    useEffect(() => {
        console.log("asdasdasd");

        ws.onopen = () => {
            console.log('WebSocket connection opened');
            // Bağlantı başarılı olduğunda yapılacak işlemler
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setLastMessage(data)
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = (event) => {
            console.log('WebSocket disconnected:', event.reason);
        };

        socket.current = ws;


        return () => {
            socket.current?.close();
        };
    }, []);

    return (
        <IdentifyGlobalWebSocketContext.Provider value={{ sendMessage, addMessageHandler, removeMessageHandler }}>
            {children}
        </IdentifyGlobalWebSocketContext.Provider>
    );
};

export const useIdentifyGlobalWebSocket = () => {
    const context = useContext(IdentifyGlobalWebSocketContext);
    if (!context) {
        throw new Error('useIdentifyGlobalWebSocket must be used within an IdentifyGlobalWebSocketProvider');
    }
    return context;
};
