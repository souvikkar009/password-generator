import { RxCopy } from "react-icons/rx";
import { TfiReload } from "react-icons/tfi";
import { useState, useCallback, useRef, useEffect } from "react";

function App() {
    const [passwoedLength, setPasswoedLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(true);
    const [uppercaseAllowed, setUppercaseAllowed] = useState(true);
    const [lowercaseAllowed, setLowercaseAllowed] = useState(true);
    const [symbolAllowed, setSymbolAllowed] = useState(true);
    const [password, setPassword] = useState("");
    const [regenrate, setRegenrate] = useState(false);

    const passRef = useRef(null);

    // const appendCharInPassword = useCallback(()=>{
    //     passRef.current.
    // }, password)

    const generatePassword = useCallback(() => {
        let pass = "";
        let str = ``;
        if (numberAllowed) str += `01234567890`;
        if (uppercaseAllowed) str += `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
        if (lowercaseAllowed) str += `abcdefghijklmnopqrstuvwxyz`;
        if (symbolAllowed) str += `!@#$%^&*()-+`;

        for (let i = 0; i < passwoedLength; i++) {
            let idx = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(idx - 1);
        }
        setPassword(pass);
    }, [
        passwoedLength,
        numberAllowed,
        uppercaseAllowed,
        lowercaseAllowed,
        symbolAllowed,
    ]);

    useEffect(() => {
        generatePassword();
    }, [
        passwoedLength,
        numberAllowed,
        uppercaseAllowed,
        lowercaseAllowed,
        symbolAllowed,
        regenrate,
        generatePassword,
    ]);

    const copyToClipboard = () => {
        window.navigator.clipboard.writeText(password);
        passRef.current.select();
    };

    return (
        <div className="flex justify-center align-top pt-12">
            <div className="flex flex-col items-center m-2 lg:w-1/2">
                <div className="mb-4 text-2xl">Password Generator</div>
                <div className="w-full p-6 flex items-center justify-between gap-2 bg-white px-6 rounded-tr-2xl rounded-tl-2xl mb-6">
                    <input
                        spellCheck="false"
                        type="text"
                        className="w-full focus:outline-none text-2xl"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        ref={passRef}
                        readOnly
                    />
                    <div className="flex items-center gap-2">
                        <RxCopy
                            className="text-2xl cursor-pointer"
                            onClick={copyToClipboard}
                        />
                        <TfiReload
                            className="text-2xl cursor-pointer"
                            onClick={() => {
                                setRegenrate((prev) => !prev);
                            }}
                        />
                    </div>
                </div>
                <div className="bg-white w-full py-8 px-6 rounded-xl flex flex-col gap-4">
                    <div className="text-xl font-bold text-center">
                        Customize Your Password
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col items-center gap-4 text-xl justify-self-center">
                            <div className="font-semibold">Password Length</div>
                            <input
                                type="range"
                                min={6}
                                max={30}
                                name="p-length"
                                defaultValue={passwoedLength}
                                onChange={(e) =>
                                    setPasswoedLength(e.target.value)
                                }
                                className="w-full"
                            />
                            <label htmlFor="p-length">
                                Length: <span className="font-semibold">{passwoedLength}</span>
                            </label>
                        </div>
                        <div className="flex flex-col item-center gap-1 justify-self-center">
                            <label className="checkbox-style">
                                <input
                                    type="checkbox"
                                    name="uppercase"
                                    defaultChecked={uppercaseAllowed}
                                    onChange={() => {
                                        setUppercaseAllowed((prev) => !prev);
                                    }}
                                />
                                Uppercase
                            </label>

                            <label className="checkbox-style">
                                <input
                                    type="checkbox"
                                    name="lowercase"
                                    defaultChecked={lowercaseAllowed}
                                    onChange={() => {
                                        setLowercaseAllowed((prev) => !prev);
                                    }}
                                />
                                Lowercase
                            </label>

                            <label className="checkbox-style">
                                <input
                                    type="checkbox"
                                    name="number"
                                    defaultChecked={numberAllowed}
                                    onChange={() => {
                                        setNumberAllowed((prev) => !prev);
                                    }}
                                />
                                Number
                            </label>

                            <label className="checkbox-style">
                                <input
                                    type="checkbox"
                                    name="Symbol"
                                    defaultChecked={symbolAllowed}
                                    onChange={() => {
                                        setSymbolAllowed((prev) => !prev);
                                    }}
                                />
                                Symbol
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
