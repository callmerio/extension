// src/contentScript/index.ts
console.info('contentScript is running');
import { createRoot } from 'react-dom/client';

import TextSelectionPopup from '@/components/TextSelectionPopup';

const app = document.createElement('div');
app.id = 'pop';
document.body.appendChild(app);

const root = createRoot(app); // 创建一个root
root.render(<TextSelectionPopup/>);
