from setuptools import setup

setup(
    name='Slop Studio',
    version='666.0',
    long_description=__doc__,
    packages=['slopstudio'],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'flask>=1.1.1',
        'flask-socketio',
        'python-dotenv>=0.12.0'
    ]
)
