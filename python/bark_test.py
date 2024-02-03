from bark import SAMPLE_RATE, generate_audio, preload_models
from IPython.display import Audio
from scipy.io.wavfile import write as write_wav

# download and load all models
# preload_models()

# generate audio from text
text_prompt = """
     你好，我是周杰伦，小龙现在在休假，有急事请电话联系他。
"""
audio_array = generate_audio(text_prompt)

write_wav("/Users/mgfjx/Desktop/projects/第三方库/bark-demo/audio2.wav", SAMPLE_RATE, audio_array)

# play text in notebook
Audio(audio_array, rate=SAMPLE_RATE)